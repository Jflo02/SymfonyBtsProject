<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211103165831 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, infirmier_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649C2BE0752 (infirmier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649C2BE0752 FOREIGN KEY (infirmier_id) REFERENCES infirmier (id)');
        $this->addSql('ALTER TABLE infirmier CHANGE service_id service_id INT NOT NULL');
        $this->addSql('ALTER TABLE sejour CHANGE patient_id patient_id INT NOT NULL, CHANGE date_sortie date_sortie DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD nom VARCHAR(255) NOT NULL, DROP date_entree, DROP date_sortie');
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251E84CF0CF');
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251EED5CA9E6');
        $this->addSql('ALTER TABLE service_sejour ADD id INT AUTO_INCREMENT NOT NULL, ADD date_entree DATETIME NOT NULL, ADD date_sortie DATETIME DEFAULT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251E84CF0CF FOREIGN KEY (sejour_id) REFERENCES sejour (id)');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251EED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user');
        $this->addSql('ALTER TABLE infirmier CHANGE service_id service_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE sejour CHANGE patient_id patient_id INT DEFAULT NULL, CHANGE date_sortie date_sortie DATETIME NOT NULL');
        $this->addSql('ALTER TABLE service ADD date_entree DATETIME NOT NULL, ADD date_sortie DATETIME DEFAULT NULL, DROP nom');
        $this->addSql('ALTER TABLE service_sejour MODIFY id INT NOT NULL');
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251E84CF0CF');
        $this->addSql('ALTER TABLE service_sejour DROP FOREIGN KEY FK_A832251EED5CA9E6');
        $this->addSql('ALTER TABLE service_sejour DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE service_sejour DROP id, DROP date_entree, DROP date_sortie');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251E84CF0CF FOREIGN KEY (sejour_id) REFERENCES sejour (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_sejour ADD CONSTRAINT FK_A832251EED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_sejour ADD PRIMARY KEY (service_id, sejour_id)');
    }
}
