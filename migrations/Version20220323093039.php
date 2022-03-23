<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220323093039 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE creneau_infirmier ADD infirmier_id INT NOT NULL');
        $this->addSql('ALTER TABLE creneau_infirmier ADD CONSTRAINT FK_B90D61C5C2BE0752 FOREIGN KEY (infirmier_id) REFERENCES infirmier (id)');
        $this->addSql('CREATE INDEX IDX_B90D61C5C2BE0752 ON creneau_infirmier (infirmier_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE creneau_infirmier DROP FOREIGN KEY FK_B90D61C5C2BE0752');
        $this->addSql('DROP INDEX IDX_B90D61C5C2BE0752 ON creneau_infirmier');
        $this->addSql('ALTER TABLE creneau_infirmier DROP infirmier_id');
    }
}
